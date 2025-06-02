# Implementatiehandleiding: Drop Shadow voor Ronde Transparante Afbeeldingen

**Doel:** Een robuust systeem implementeren waarbij ronde afbeeldingen (vaak met transparante achtergronden) correct een `drop-shadow` effect krijgen dat de contouren van de afbeelding zelf volgt, in plaats van de rechthoekige container. Dit systeem moet ook zorgen voor een natuurlijke, responsive weergave van deze afbeeldingen.

## Probleemstelling Initieel

Voorafgaand aan deze implementatie werden schaduwen vaak toegepast op de container van een afbeelding. Dit resulteerde in:
1.  Een rechthoekige schaduw, zelfs als de afbeelding rond was.
2.  Schaduwen die werden afgekapt door `overflow-hidden` op de container.
3.  Ronde afbeeldingen die soms in een onnatuurlijke aspect ratio werden gedwongen.
4.  **Next.js Image sizing problemen**: Afbeeldingen die beperkt werden door te kleine `width`/`height` props ondanks correcte `sizes` attributes.
5.  **AspectRatio componenten die natuurlijke beeldverhoudingen verstoren**: Vooral bij hero sections waar afbeeldingen in onnatuurlijke verhoudingen werden gedwongen.

## Oplossingsstrategie

De oplossing bestaat uit aanpassingen in de `OptimizedImage` component, de consumerende section-componenten, en de Tailwind configuratie.

### Stap 1: Aanpassingen aan `OptimizedImage` Component (`components/ui/optimized-image.tsx`)

1.  **`dropShadow` Prop Toegevoegd:**
    *   Een nieuwe prop `dropShadow` is geïntroduceerd. Deze accepteert waarden zoals `'none'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`, of een custom `drop-shadow-[value]` string.
    ```typescript
    interface OptimizedImageProps {
      // ... andere props
      dropShadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | string;
    }

    export default function OptimizedImage({
      // ... andere props
      dropShadow = 'none', // Default naar 'none'
    }: OptimizedImageProps) {
      // ...
    }
    ```

2.  **`getDropShadowClass` Functie:**
    *   Deze helper-functie vertaalt de `dropShadow` prop-waarde naar de corresponderende Tailwind utility class.
    ```typescript
    const getDropShadowClass = (shadow: string) => {
      switch (shadow) {
        case 'sm': return 'drop-shadow-sm';
        case 'md': return 'drop-shadow-md';
        case 'lg': return 'drop-shadow-lg';
        case 'xl': return 'drop-shadow-xl';
        case '2xl': return 'drop-shadow-2xl'; // ESSENTIËLE TOEVOEGING/FIX!
        case 'none': return '';
        default:
          return shadow.startsWith('drop-shadow') ? shadow : `drop-shadow-[${shadow}]`;
      }
    };
    ```
    *   **⚠️ KRITIEKE BUG FIX:** Zorg ervoor dat de `'2xl'` case expliciet wordt behandeld om `drop-shadow-2xl` te retourneren. Een eerdere bug zorgde ervoor dat dit viel onder de `default` case, wat resulteerde in `drop-shadow-[2xl]`, een incorrecte class die niet werkt.

3.  **Conditioneel Verwijderen van `overflow-hidden`:**
    *   Om te voorkomen dat de drop shadow wordt afgekapt, wordt `overflow-hidden` van de direct-parent `div` van de `next/image` component verwijderd als er een actieve `dropShadow` is.
    ```typescript
    const containerOverflow = dropShadow !== 'none' ? '' : 'overflow-hidden';

    return (
      <div className={cn('relative', containerOverflow, className)}>
        {/* ... */}
      </div>
    );
    ```

4.  **Toepassen van Drop Shadow Class op `next/image`:**
    *   De gegenereerde drop shadow class wordt direct toegepast op de `className` van de `Image` component van Next.js.
    ```typescript
        <Image
          // ... andere props
          className={cn(
            // ... andere classes
            getDropShadowClass(dropShadow)
          )}
        />
    ```

### Stap 2: Logica in Consumerende Componenten

#### 2A: Ronde Afbeeldingen (bijv. `components/sections/about-section.tsx`)

De logica hier is cruciaal voor het correct weergeven van *ronde* afbeeldingen met de gewenste schaduw en natuurlijke aspect ratio.

1.  **Detectie van Ronde Afbeeldingen:**
    *   Een eenvoudige, maar effectieve methode is om de bestandsnaam van de afbeelding te controleren op de aanwezigheid van het woord "circle".
    ```typescript
    const isCircleImage = image?.src?.includes('circle');
    ```

2.  **⚠️ KRITIEK: Next.js Image Sizing Parameters:**
    
    **Het belangrijkste concept:** De `width` en `height` props van Next.js `<Image>` bepalen de **maximale intrinsieke grootte** van de afbeelding. Zelfs als je `sizes` correct instelt, kan de afbeelding nooit groter worden dan deze `width`/`height` waarden!

    **Voorbeeld van het probleem:**
    ```typescript
    // ❌ FOUT - afbeelding wordt gelimiteerd tot 500px
    <OptimizedImage
      width={500}  // Deze limiteert tot 500px max!
      height={500}
      sizes="(max-width: 640px) 90vw, (max-width: 768px) 400px, 600px" // 600px werkt niet!
    />

    // ✅ CORRECT - afbeelding kan tot 600px groeien
    <OptimizedImage
      width={600}  // Nu kan de afbeelding 600px worden
      height={600}
      sizes="(max-width: 640px) 90vw, (max-width: 768px) 400px, 600px"
    />
    ```

3.  **Drop Shadow Intensiteit:**
    
    **Belangrijk verschil tussen shadow types:**
    - `shadow-2xl` (box-shadow) = opacity 0.25 (sterker)
    - `drop-shadow-2xl` (filter) = opacity 0.15 (zwakker)
    
    **Voor sterke, zichtbare schaduwen gebruik:**
    ```typescript
    // Voor sterke schaduw die de vorm volgt
    dropShadow="drop-shadow-[0_25px_50px_rgba(0,0,0,0.25)]"
    
    // In plaats van de zwakkere
    dropShadow="2xl" // Te licht voor prominente afbeeldingen
    ```

4.  **Conditionele Rendering Logica voor Ronde Afbeeldingen:**

    *   **Voor Ronde Afbeeldingen (`isCircleImage === true`):**
        *   Gebruik *geen* `<AspectRatio>` component.
        *   **BELANGRIJKE SIZING:** Stel `width` en `height` props in die overeenkomen met je gewenste maximale grootte (bijv. `width={600} height={600}` voor max 600px afbeeldingen).
        *   Pas de volgende classes toe op de `OptimizedImage` component zelf voor responsiviteit en vorm:
            *   `max-w-full`: Zorgt ervoor dat de afbeelding nooit breder is dan zijn container.
            *   `h-auto`: Behoudt de natuurlijke aspect ratio.
            *   `rounded-full`: Maakt de afbeelding daadwerkelijk rond.
        *   **GEEN dubbele schaduw:** Gebruik ALLEEN `dropShadow` prop, niet ook `shadow-*` classes in className.
        *   **Belangrijk:** Wikkel de `OptimizedImage` in een `div` met padding (bijv. `className="flex justify-center p-4"`). Deze padding is essentieel om te voorkomen dat de drop shadow wordt afgekapt door de randen van de parent container of door naastliggende elementen.

        ```typescript
        // ✅ CORRECTE implementatie voor ronde afbeeldingen
        if (isCircleImage && image?.src) {
          return (
            <div className="flex justify-center p-4"> {/* Padding voor schaduwruimte */}
              <OptimizedImage
                src={image.src}
                alt={image.alt || 'Beschrijvende alt tekst'}
                width={600} // Bepaalt max grootte - belangrijk!
                height={600} // Moet overeenkomen met gewenste max
                sizes="(max-width: 640px) 90vw, (max-width: 768px) 400px, 600px" // Responsive sizes
                className="max-w-full h-auto rounded-full" // GEEN shadow-* classes hier!
                dropShadow="drop-shadow-[0_25px_50px_rgba(0,0,0,0.25)]" // Sterke custom schaduw
                priority={true} // Indien van toepassing
              />
            </div>
          );
        }
        ```

#### 2B: Hero Section Aspect Ratio Fix (`components/sections/hero-section.tsx`)

**⚠️ BELANGRIJKE ASPECT RATIO FIX:** Voor homepage hero images (gewoonlijk full-body images), vervang de verstorende `<AspectRatio>` component door een flexibele container.

**Het probleem:** De `<AspectRatio ratio={6/5}>` component dwong images in een onnatuurlijke 6:5 verhouding, waardoor vooral portret-images er uitgerekt of afgesneden uitzagen.

**De oplossing:**

1.  **Oude implementatie (Problematisch):**
    ```typescript
    // ❌ FOUT - Forces 6:5 aspect ratio
    <AspectRatio ratio={6 / 5} className="overflow-visible rounded-xl shadow-2xl relative">
      <OptimizedImage
        src={imageToDisplay}
        alt={imageAltText}
        fill // Forces image to fill container
        sizes="(max-width: 600px) 100vw, 600px"
        className="absolute inset-0 object-cover rounded-xl" // object-cover crops image
        priority
        ...
      />
    </AspectRatio>
    ```

2.  **Nieuwe implementatie (Flexibel):**
    ```typescript
    // ✅ CORRECT - Natural aspect ratio with max-width constraint
    <div className="relative max-w-[450px] mx-auto">
      <OptimizedImage
        src={imageToDisplay}
        alt={imageAltText}
        width={600} // Intrinsic max width
        height={600} // Intrinsic max height (scales proportionally)
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
        className="max-w-full h-auto rounded-xl shadow-2xl" // Natural scaling
        priority
        ...
      />
    </div>
    ```

**Belangrijke voordelen van deze fix:**
- **Natuurlijke verhoudingen:** Images behouden hun oorspronkelijke aspect ratio
- **Flexibele grootte:** Container past zich aan aan de image grootte (tot max-width)  
- **Geen cropping:** Geen delen van de image worden afgesneden
- **Responsive gedrag:** Schaal netjes op alle schermgroottes
- **Professionele weergave:** Images zien er natuurlijk en onverstoord uit

**Voor reguliere (niet-ronde) afbeeldingen in andere secties:**
```typescript
// Voorbeeld voor reguliere afbeeldingen waar je WEL een vaste ratio wilt
return (
  <AspectRatio ratio={6 / 5} className="overflow-visible rounded-xl shadow-2xl relative">
    <OptimizedImage
      src={image.src}
      alt={image.alt || 'Beschrijvende alt tekst'}
      fill
      sizes="(max-width: 600px) 100vw, 600px"
      className="absolute inset-0 object-cover rounded-xl" // Standaard styling
      dropShadow="none" // Geen directe schaduw op afbeelding zelf
      priority={true}
    />
  </AspectRatio>
);
```

### Stap 3: Tailwind Configuratie (`tailwind.config.ts`)

1.  **Safelisting van Drop Shadow Utilities:**
    *   Voeg de gebruikte `drop-shadow` utility classes toe aan de `safelist` in `tailwind.config.ts`. Dit zorgt ervoor dat Tailwind deze classes niet per ongeluk purged tijdens het build proces, vooral als ze dynamisch worden toegepast of als de `dropShadow` prop in de toekomst via complexere logica wordt bepaald.
    ```typescript
    // tailwind.config.ts
    module.exports = {
      // ...
      safelist: [
        // ... andere safelisted classes
        'drop-shadow-sm',
        'drop-shadow-md',
        'drop-shadow-lg',
        'drop-shadow-xl',
        'drop-shadow-2xl', // Belangrijk!
      ],
      // ...
    };
    ```

### Stap 4: Verificatie

1.  **Build:** Voer `npm run build` (of de equivalente build commando) uit om te controleren op compilatie- en typefouten.
2.  **Visuele Inspectie:** Controleer de pagina's waar de ronde afbeeldingen worden gebruikt in een browser.
    *   Verifieer dat de schaduw correct wordt weergegeven rond de contouren van de afbeelding.
    *   Verifieer dat de afbeelding responsief is en zijn natuurlijke aspect ratio behoudt.
    *   Controleer of de schaduw niet wordt afgekapt.
    *   **Controleer sizing:** Verifieer dat afbeeldingen daadwerkelijk de gewenste maximale grootte bereiken op desktop.
    *   **Hero section check:** Controleer dat hero images hun natuurlijke verhouding behouden en niet vervormd zijn.

## ⚠️ Veelgemaakte Fouten & Troubleshooting

### 1. **Afbeelding blijft klein ondanks juiste `sizes`**
**Oorzaak:** `width`/`height` props zijn te klein.
**Oplossing:** Verhoog `width` en `height` props naar gewenste maximum.

### 2. **Schaduw is te licht/onzichtbaar**
**Oorzaak:** `drop-shadow-2xl` is lichter dan `shadow-2xl`.
**Oplossing:** Gebruik custom drop-shadow: `dropShadow="drop-shadow-[0_25px_50px_rgba(0,0,0,0.25)]"`

### 3. **Dubbele schaduw effecten**
**Oorzaak:** Zowel `dropShadow` prop als `shadow-*` class gebruikt.
**Oplossing:** Gebruik ALLEEN `dropShadow` prop voor ronde afbeeldingen.

### 4. **Schaduw wordt afgekapt**
**Oorzaak:** Parent container heeft `overflow-hidden` of geen padding.
**Oplossing:** Voeg `p-4` toe aan wrapper div en zorg dat `overflow-hidden` wordt weggehaald door OptimizedImage.

### 5. **`drop-shadow-[2xl]` in plaats van `drop-shadow-2xl`**
**Oorzaak:** Ontbrekende `'2xl'` case in `getDropShadowClass` switch statement.
**Oplossing:** Voeg expliciet `case '2xl': return 'drop-shadow-2xl';` toe.

### 6. **Hero images zien er uitgerekt of afgesneden uit**
**Oorzaak:** `<AspectRatio>` component dwingt onnatuurlijke verhoudingen.
**Oplossing:** Vervang door flexibele container met `max-w-[450px]` en gebruik `width`/`height` props met `h-auto`.

### 7. **Images vullen niet de gewenste ruimte in hero section**
**Oorzaak:** `max-w-[450px]` limiet is te klein voor gewenste weergave.
**Oplossing:** Pas `max-w-[500px]` of `max-w-[600px]` aan en verhoog corresponderende `width`/`height` props.

## Samenvatting van Voordelen

*   Correcte, esthetisch aangename schaduwen voor ronde en transparante afbeeldingen.
*   Behoud van natuurlijke aspect ratio's voor deze afbeeldingen.
*   Flexibel systeem dankzij de `dropShadow` prop.
*   Centrale logica in `OptimizedImage` voor herbruikbaarheid.
*   **Juiste responsive sizing** die werkt met Next.js Image optimalisatie.
*   **Configureerbare schaduw intensiteit** voor verschillende use cases.
*   **Natuurlijke hero image weergave** zonder gedwongen aspect ratios.
*   **Professionele uitstraling** die past bij verschillende image types en content.

## 📋 Implementation Checklist

**Voor ronde afbeeldingen:**
- [ ] `image.src.includes('circle')` detectie geïmplementeerd
- [ ] `dropShadow` prop toegevoegd aan OptimizedImage
- [ ] `getDropShadowClass` functie bevat alle cases, inclusief `'2xl'`
- [ ] Wrapper div heeft `p-4` padding voor schaduw ruimte
- [ ] `width` en `height` props zijn groot genoeg (600x600 aanbevolen)
- [ ] Alleen `dropShadow` prop gebruiken, geen `shadow-*` classes in className

**Voor hero sections:**
- [ ] `<AspectRatio>` component vervangen door flexibele container
- [ ] `fill` prop vervangen door `width`/`height` props
- [ ] `h-auto` class toegevoegd voor natuurlijke scaling
- [ ] `max-w-[450px]` of gewenste max-width ingesteld
- [ ] `object-cover` vervangen door `object-scale-down` of weggelaten

**Algemeen:**
- [ ] Drop-shadow utilities toegevoegd aan Tailwind safelist
- [ ] `npm run build` test geslaagd
- [ ] Visuele controle op verschillende schermgroottes
- [ ] Schaduw intensiteit en zichtbaarheid gecontroleerd

Door deze stappen te volgen, kan een AI-agent of ontwikkelaar dit drop-shadow systeem succesvol implementeren en onderhouden in de template codebase.
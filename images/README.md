# Images Directory

Questa cartella contiene tutte le immagini SVG del sito B&B Elegante.

## File Disponibili

### `hero-bg.svg`
- **Descrizione**: Immagine di sfondo per la sezione hero
- **Dimensioni**: 800x600px
- **Stile**: Gradiente blu-viola con elementi decorativi
- **Uso**: Sezione principale del sito

### `room-deluxe.svg`
- **Descrizione**: Illustrazione della Camera Deluxe
- **Dimensioni**: 400x300px
- **Stile**: Design moderno con letto king-size
- **Caratteristiche**: Bagno privato, WiFi, balcone

### `room-suite.svg`
- **Descrizione**: Illustrazione della Suite Romantica
- **Dimensioni**: 400x300px
- **Stile**: Design romantico con jacuzzi
- **Caratteristiche**: Jacuzzi, colazione inclusa, vista città

### `room-apartment.svg`
- **Descrizione**: Illustrazione dell'Appartamento Famiglia
- **Dimensioni**: 400x300px
- **Stile**: Layout completo con 2 camere
- **Caratteristiche**: 2 camere da letto, cucina, soggiorno

## Vantaggi delle Immagini SVG

1. **Scalabilità**: Si adattano a qualsiasi dimensione senza perdita di qualità
2. **Performance**: File molto leggeri, caricano velocemente
3. **Personalizzabilità**: Facili da modificare con CSS
4. **Accessibilità**: Supporto per screen reader
5. **Offline**: Funzionano senza connessione internet

## Personalizzazione

Per modificare le immagini:

1. **Colori**: Modifica i valori `fill` negli elementi SVG
2. **Dimensioni**: Cambia `width` e `height` nell'HTML
3. **Stile**: Aggiungi CSS per effetti hover o animazioni

## Esempio di Personalizzazione CSS

```css
.room-image svg {
  transition: transform 0.3s ease;
}

.room-image:hover svg {
  transform: scale(1.05);
}
```

## Note Tecniche

- Tutte le immagini sono ottimizzate per il web
- Utilizzano il sistema di colori del design system
- Sono responsive e si adattano a tutti i dispositivi
- Supportano il tema chiaro/scuro (se implementato) 
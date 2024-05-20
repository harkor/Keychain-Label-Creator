import { PDFDocument, PDFFont, PDFPage, rgb, StandardFonts } from 'pdf-lib';
import { Size } from '../types';

export const mmToPoints = (mm: number) => mm * 2.83465;

export const wrapText = (
  text: string,
  maxWidth: number,
  fontSize: number,
  font: PDFFont,
) => {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  words.forEach((word) => {
    const testLine = currentLine + word + ' ';
    const testWidth = font.widthOfTextAtSize(testLine, fontSize);
    if (testWidth > maxWidth) {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine = testLine;
    }
  });
  lines.push(currentLine.trim());
  return lines;
};

export const createLabel = async (
  pdfDoc: PDFDocument,
  page: PDFPage,
  x: number,
  y: number,
  size: Size,
  text: string,
  debug = false,
) => {
  page.drawRectangle({
    x: x,
    y: y,
    width: size.width,
    height: size.height,
    borderColor: rgb(0.9, 0.9, 0.9),
    borderWidth: 1,
  });

  if (debug) {
    page.drawRectangle({
      x: x + (size.width - size.inner.width) / 2,
      y: y + (size.height - size.inner.height) / 2,
      width: size.inner.width,
      height: size.inner.height,
      borderColor: rgb(1, 0, 0),
      borderWidth: 1,
    });
  }

  const fontSize = 12;
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Fonction pour diviser le texte en plusieurs lignes

  const wrappedText = wrapText(text, size.inner.width, fontSize, font);

  // Calcul de la hauteur totale des lignes de texte
  const lineHeight = fontSize * 1.2; // ajustez ce facteur selon vos préférences
  const totalTextHeight = lineHeight * wrappedText.length;

  // Calcul de la position Y de la première ligne pour centrer verticalement
  const textYStart =
    y +
    (size.height - size.inner.height) / 2 +
    (size.inner.height - totalTextHeight) / 2 +
    totalTextHeight -
    fontSize;

  // Dessin du texte ligne par ligne
  wrappedText.forEach((line, index) => {
    const textX =
      x +
      (size.width - size.inner.width) / 2 +
      (size.inner.width - font.widthOfTextAtSize(line, fontSize)) / 2;
    const textY = textYStart - index * lineHeight;
    page.drawText(line, {
      x: textX,
      y: textY,
      size: fontSize,
      font: font,
      color: rgb(0, 0, 0),
    });
  });
};

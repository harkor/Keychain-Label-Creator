import { PDFDocument } from 'pdf-lib';
import * as fs from 'fs';
import { createLabel, mmToPoints } from './utils';

async function createPdf() {
  const pdfDoc = await PDFDocument.create();

  const pageWidth = mmToPoints(279);
  const pageHeight = mmToPoints(210);

  const page = pdfDoc.addPage([pageWidth, pageHeight]);

  const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

  const { labels, spacing, debug } = data;

  const start = {
    x: mmToPoints(data.start.x),
    y: page.getHeight() - mmToPoints(data.start.y),
  };

  const size = {
    width: mmToPoints(data.size.width),
    height: mmToPoints(data.size.height),
    inner: {
      width: mmToPoints(data.size.inner.width),
      height: mmToPoints(data.size.inner.height),
    },
  };

  let i = 0;
  let j = 0;
  let k = 0;
  while (k < labels.length) {
    const text = labels[k];
    await createLabel(
      pdfDoc,
      page,
      start.x + j * (size.width + spacing),
      start.y - i * (size.height + spacing),
      size,
      text,
      debug,
    );
    j++;
    if (j === data.itemsPerRow) {
      j = 0;
      i++;
    }
    k++;
  }

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('output.pdf', pdfBytes);
}

createPdf()
  .then(() => {
    console.log('PDF created successfully!');
  })
  .catch((err) => {
    console.error('Error:', err);
  });

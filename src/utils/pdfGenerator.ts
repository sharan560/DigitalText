export const downloadAsPDF = (text: string, fileName: string = 'document.pdf') => {
  // Create a simple PDF-like text file for now
  // For production, use a library like pdfkit or html2pdf
  const element = document.createElement('a');
  const file = new Blob([text], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = fileName.replace('.pdf', '.txt');
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

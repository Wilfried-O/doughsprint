export function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    try {
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click(); // we don't append to DOM; modern browsers handle this well
    } finally {
        URL.revokeObjectURL(url); // always free the object URL (even if click throws)
    }
}

export function downloadText(
    text,
    filename,
    mime = 'text/plain;charset=utf-8'
) {
    const blob = new Blob([text], { type: mime });
    downloadBlob(blob, filename);
}

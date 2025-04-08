export function formatDate(isoDateStr : string) {
    const date = new Date(isoDateStr);
  
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' }); 
    const year = date.getFullYear();
  
    return `${day} ${month}, ${year}`;
  }
  
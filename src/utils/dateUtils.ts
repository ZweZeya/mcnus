export const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
    weekday: 'short', 
    year: 'numeric',  
    month: 'short',   
    day: 'numeric'   
  })
}

export const isPast = (date: Date): boolean => {
  return new Date(date) < new Date();
}
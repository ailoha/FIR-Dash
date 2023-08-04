export const numberFormatter = new Intl.NumberFormat('zh-CN', {
  minimumFractionDigits: 2,
});
  
export const dateFormatter = (dateString: Date | null) => {
  if (!dateString) {
    return '----年--月--日';
  }
    
  const dateFormat = new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return dateFormat.format(new Date(dateString));
};

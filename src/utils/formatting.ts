export const formatAmount = (amount: number | null) => {
  if (amount === null || amount === undefined) {
    return '-.--';
  } else {
    const amountFormat = new Intl.NumberFormat('zh-CN', {
      minimumFractionDigits: 2,
    });
    return amountFormat.format(amount);
  }
};

export const formatDate = (dateString: Date | null) => {
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

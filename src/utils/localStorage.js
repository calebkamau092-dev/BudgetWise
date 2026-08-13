const STORAGE_KEY = 'budgetwise_transactions';

export const saveTransactions = (transactions) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
};

export const loadTransactions = () => {
  const storedTransactions = localStorage.getItem(STORAGE_KEY);

  if (!storedTransactions) {
    return [];
  }

  try {
    return JSON.parse(storedTransactions);
  } catch (error) {
    console.error('Error loading transactions:', error);
    return [];
  }
};

export const clearTransactions = () => {
  localStorage.removeItem(STORAGE_KEY);
};
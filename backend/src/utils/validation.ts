export class ValidationError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'ValidationError';
    }
  }
  
  export const validateCPF = (cpf: string): boolean => {
    const cleanCPF = cpf.replace(/\D/g, '');
  
    if (cleanCPF.length !== 11) {
      return false;
    }
  
    if (/^(\d)\1{10}$/.test(cleanCPF)) {
      return false;
    }
  
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit > 9) digit = 0;
    if (digit !== parseInt(cleanCPF.charAt(9))) {
      return false;
    }
  
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit > 9) digit = 0;
    if (digit !== parseInt(cleanCPF.charAt(10))) {
      return false;
    }
  
    return true;
  };
  
  export const validateRA = (ra: string): boolean => {

    const cleanRA = ra.replace(/\D/g, '');
    
    if (cleanRA.length !== 8) {
      return false;
    }
  
    if (!/^\d+$/.test(cleanRA)) {
      return false;
    }
  
    return true;
  };
  
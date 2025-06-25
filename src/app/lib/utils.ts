import { FeedbackFormData } from "./types";


export const formatVehicleNumber = (input: string): string => {
  return input.toUpperCase().replace(/[^A-Z0-9]/g, '');
};

export const validateVehicleNumber = (vehicleNumber: string): boolean => {
  // Basic validation for Indian vehicle numbers
  const pattern = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{4}$/;
  return pattern.test(vehicleNumber);
};

export const getTotalFeedbackCount = (feedbackData: FeedbackFormData['feedbackData']): number => {
  return Object.values(feedbackData).reduce((total, category) => {
    return total + category.positive.length + category.negative.length;
  }, 0);
};
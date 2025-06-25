
export interface FeedbackFormData {
  vehicleNumber: string;
  feedbackData: {
    [categoryId: string]: {
      positive: string[];
      negative: string[];
    };
  };
  additionalComments?: string;
  photoUrl?: string;
  hasPhoto?: boolean;
  userId?: string;
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

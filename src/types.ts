export interface ManualItem {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  tips: string[];
  hasSubTabs?: boolean;
  departureTitle?: string;
  arrivalTitle?: string;
  departureDesc?: string;
  arrivalDesc?: string;
  departureTips?: string[];
  arrivalTips?: string[];
  departureVideoUrl?: string;
  arrivalVideoUrl?: string;
  manualTitle?: string;
  manualDesc?: string;
  manualTips?: string[];
  manualVideoUrl?: string;
  newLiftTitle?: string;
  newLiftDesc?: string;
  newLiftTips?: string[];
  newLiftVideoUrl?: string;
}

export interface Category {
  id: string;
  title: string;
  icon: string;
  items: ManualItem[];
}

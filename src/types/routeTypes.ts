export type GooglePlaceData = {
  description: string;
  id: string;
  place_id: string;
  reference: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
  formatted_address?: string;
};

export type RunParams = { distance: number } | { location: GooglePlaceData };

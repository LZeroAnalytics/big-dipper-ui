import { useState } from 'react';

type Options = {
  addresses: string[];
  skip?: boolean;
};

export const useDesmosProfile = (options: Options) => {
  const [data] = useState<any[]>([]);
  const [loading] = useState(false);
  const [error] = useState<unknown>();

  return { data, loading, error };
};

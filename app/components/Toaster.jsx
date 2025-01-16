"use client";

import { toast } from '@/hooks/use-toast';

const openNotification = ({ title, description, variant }) => {
  toast({
    title: title,
    description: description,
    style: {
      backgroundColor: variant === 'success' ? 'white' : '#EF4444',
      width: 400,
    },
  });
};

export default openNotification;
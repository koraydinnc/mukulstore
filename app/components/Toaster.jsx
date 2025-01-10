"use client";

import { toast } from '@/hooks/use-toast';

const openNotification = ({ title, description, variant }) => {
  toast({
    title: title,
    description: description,
    style: {
      backgroundColor: variant === 'success' ? 'green' : '#EF4444',
      width: 400,
    },
  });
};

export default openNotification;
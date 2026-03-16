export const formatDateEn = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };
  

export const formatDateTH = (dateString) => {
    return new Date(dateString).toLocaleDateString("th-TH", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  export const formatTimeEn = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };
  


  export const formatRelativeTime = (dateString) => {
    const now = new Date();
    const createdAt = new Date(dateString);
  
    const diffMs = now - createdAt;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  
    // น้อยกว่า 1 ชั่วโมง
    if (diffHours < 1) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return diffMinutes <= 1 ? "Just now" : `${diffMinutes} minutes ago`;
    }
  
    // น้อยกว่า 24 ชั่วโมง
    if (diffHours < 24) {
      return `${diffHours} hours ago`;
    }
  
    // มากกว่า 1 วัน
    return null;
  };
  
  
import html2canvas from "html2canvas";

export function useSocialShare() {
  function shareToTwitter(text, url) {
    const tweetText = encodeURIComponent(text);
    const tweetUrl = encodeURIComponent(url || window.location.href);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`;
    window.open(twitterUrl, "_blank", "width=550,height=420");
  }

  function shareToFacebook(url) {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url || window.location.href
    )}`;
    window.open(facebookUrl, "_blank", "width=550,height=420");
  }

  function shareToWhatsApp(text, url) {
    const message = encodeURIComponent(
      `${text}\n\n${url || window.location.href}`
    );
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, "_blank");
  }

  async function shareViaWebAPI(text, url, file) {
    if (!navigator.share) {
      return false;
    }

    try {
      const shareData = {
        title: "CAN Bracket - Mes prédictions",
        text: text,
        url: url || window.location.href,
      };

      if (file) {
        shareData.files = [file];
      }

      await navigator.share(shareData);
      return true;
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error sharing:", error);
      }
      return false;
    }
  }

  async function downloadAsImage(elementRef, filename = "can-bracket.png") {
    if (!elementRef) {
      console.error("Element reference is required");
      return null;
    }

    let element = null;
    if (elementRef.value) {
      element = elementRef.value.$el || elementRef.value;
    } else {
      element = elementRef;
    }

    if (!element) {
      console.error("Element not found");
      return null;
    }

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: "#c1272d",
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: false,
      });

      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Failed to create blob");
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, "image/png");
    } catch (error) {
      console.error("Error generating image:", error);
      return null;
    }
  }

  async function shareImageViaWebAPI(elementRef) {
    if (!navigator.share || !elementRef) {
      return false;
    }

    const element = elementRef.value?.$el || elementRef.value || elementRef;

    if (!element) {
      return false;
    }

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: "#c1272d",
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: false,
      });

      return new Promise((resolve) => {
        canvas.toBlob(async (blob) => {
          if (!blob) {
            resolve(false);
            return;
          }

          const file = new File([blob], "can-bracket.png", {
            type: "image/png",
          });

          try {
            await navigator.share({
              title: "CAN Bracket - Mes prédictions",
              text: "Voici mes prédictions pour la CAN 2025 !",
              files: [file],
            });
            resolve(true);
          } catch (error) {
            if (error.name !== "AbortError") {
              console.error("Error sharing image:", error);
            }
            resolve(false);
          }
        }, "image/png");
      });
    } catch (error) {
      console.error("Error generating image for share:", error);
      return false;
    }
  }

  return {
    shareToTwitter,
    shareToFacebook,
    shareToWhatsApp,
    shareViaWebAPI,
    downloadAsImage,
    shareImageViaWebAPI,
  };
}

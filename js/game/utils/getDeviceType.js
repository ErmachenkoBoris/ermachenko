// TODO REFACTOR
const deviceTypes = {
    desktop: "desktop",
    mobile: "mobile",
    tablet: "tablet"
}

const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      return "mobile";
    }
    return "desktop";
  };

  export const isMobileOrTabler = () => {
    const deviceType = getDeviceType()
    return deviceType === deviceTypes.mobile || deviceType === deviceType.tablet
  }

  export default getDeviceType;
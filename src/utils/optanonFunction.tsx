export const handleToggleDisplay = () => {
  // const tagManagerArgs = {
  //   gtmId: 'GTM-P3XTKBJ',
  //   events: {
  //       event: `Optanon.ToggleInfoDisplay()`,
  //   }
  // };
  // TagManager.initialize(tagManagerArgs);

  let Optanon: any;

  if (Boolean(window) && Boolean(window.Optanon)) {
    Optanon = window.Optanon;
  }

  if (!Boolean(window) && !Boolean(window.Optanon)) {
    Optanon = {
      ToggleInfoDisplay: () => {},
    };
  }

  Optanon.ToggleInfoDisplay();
}

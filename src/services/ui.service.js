const uiService = {
  mobile:  window.matchMedia('(max-device-width: 900px)').matches,
  isMobile: function(){
    return this.mobile;
  },
  setValue: (value) => this.value = value,
  getValue: () =>this.value,
}

window.addEventListener("resize", ($event) => {
    uiService.mobile = $event.srcElement.matchMedia('(max-device-width: 900px)').matches;
  });

export  {uiService};
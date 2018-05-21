const options = {
  width: '100%',
  height: '100%',
  stack: true,
  autoResize: false,
  showMajorLabels: true,
  // start: new Date(),
  zoomable: false,
  zoomMin: 10000000000,
  tooltip: {
    overflowMethod: 'cap'
  },
  format: {
    minorLabels: {
      minute: 'h:mma',
      hour: 'ha'
    }
  }
}

export default options;

function load_reta_inicial () {
  alert("You are visiting the home page of \n" +
      "Pete's Pickled Peppers \n" + "WELCOME!!!");
  
   var canvas = document.getElementById("canvas");

}

const processadorRetas = {
    myProperty: 'someValue',
    // object literals can contain properties and methods.
    // e.g we can define a further object for module configuration:
    myConfig: {
        useCaching: true,
        language: 'en',
    },
    // a very basic method
    saySomething() {
        console.log('Where is Paul Irish debugging today?');
    },
    // output a value based on the current configuration
    reportMyConfig() {
        console.log(
            `Caching is: ${this.myConfig.useCaching ? 'enabled' : 'disabled'}`
        );
    },
    // override the current configuration
    updateMyConfig(newConfig) {
        if (typeof newConfig === 'object') {
            this.myConfig = newConfig;
            console.log(this.myConfig.language);
        }
    },
};
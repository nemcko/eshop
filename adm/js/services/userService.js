define(['services/services'],
  function(services) {
    services.factory('UserService', [
      function() {
        return {
          getUserData: function() {
            return {
              name:'',
              surname:'',
              street:'',
              streetnum:'',
              zip:'',
              city:'',
              email:'',
              password:'',
              phone:'',
              usertype:'P',
              newuser:true
            };
          },
          getTabData: function() {
            return [
              { taburl:'tab0', title:"Browse", content:"List of data" },
              { taburl:'tab1', title:"Personal data", content:"Provide your personal data" },
              { taburl:'tab2', title:"Account data", content:"Provide your account details" },
              { taburl:'tab3', title:"Overview", content:"Data confirmation" },
              { taburl:'tab4', title:"Overview2", content:"Data confirmation" }
            ];
          }

        };
      }]);
  });

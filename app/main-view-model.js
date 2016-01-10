var observable = require("data/observable");
var LocalNotifications = require("nativescript-local-notifications");
var dialogs = require("ui/dialogs");
var DemoAppModel = (function (_super) {
  __extends(DemoAppModel, _super);
  function DemoAppModel() {
    _super.call(this);
  }

  /*
  var self = this;
  console.log("----- registering");
  LocalNotifications.register({ senderID: '<ENTER_YOUR_PROJECT_NUMBER>' }, function (data){
    console.log("----- registering done");
    self.set("message", "" + JSON.stringify(data));
  }, function() { });

  LocalNotifications.onMessageReceived(function callback(data) {
    console.log("----- message received");
    self.set("message", "" + JSON.stringify(data));
  });

  DemoAppModel.prototype.doRegister = function () {
    LocalNotifications.register().then(
        function(granted) {
          console.log("---- register done");
        }
    )
  };
  */

  DemoAppModel.prototype.doAddOnMessageReceivedCallback = function () {
    LocalNotifications.addOnMessageReceivedCallback(
        function (notificationData) {
          console.log("------------- notification received: " + notificationData);
          var notification = JSON.parse(notificationData);
          console.log("------------- notification id received: " + notification.id);
        }
    ).then(
        function() {
          console.log("---- MessageReceivedCallback has been added");
        }
    )
  };

  // TODO get rid of this in favour of the one above
  DemoAppModel.prototype.doCheckPendingNotification = function () {
    LocalNotifications.checkPendingNotification().then(
        function() {
          console.log("---- checkPendingNotification done");
        }
    )
  };

  DemoAppModel.prototype.doCheckHasPermission = function () {
    LocalNotifications.hasPermission().then(
        function(granted) {
          dialogs.alert({
            title: "Permission granted?",
            message: granted ? "YES" : "NO",
            okButtonText: "OK"
          })
        }
    )
  };

  DemoAppModel.prototype.doRequestPermission = function () {
    LocalNotifications.requestPermission({
        badge: true, // Enable setting badge through Push Notification
        sound: true, // Enable playing a sound
        alert: true  // Enable creating a alert
    }).then(
        function() {
          console.log("Permission requested");
        }
    )
  };

  DemoAppModel.prototype.doSchedule = function () {
    LocalNotifications.schedule([{
      id: 1,
      title: 'The title',
      body: 'The body',
      ticker: 'Special ticker text (Android only)',
      at: new Date(new Date().getTime() + (100*1000))
    }]).then(
        function() {
          dialogs.alert({
            title: "Notification scheduled",
            message: 'ID: 1',
            okButtonText: "OK, thanks"
          });
        },
        function(error) {
          console.log("doSchedule error: " + error);
        }
    )
  };

  DemoAppModel.prototype.doScheduleSilent = function () {
    LocalNotifications.schedule([{
      id: 2,
      title: 'Hi',
      body: 'I\'m soundless',
      //sound: null,
      at: new Date(new Date().getTime() + 140*1000)
    }]).then(
        function() {
          dialogs.alert({
            title: "Notification scheduled",
            message: 'ID: 2',
            okButtonText: "OK, thanks"
          });
        },
        function(error) {
          console.log("doScheduleSilent error: " + error);
        }
    )
  };

  DemoAppModel.prototype.doScheduleAndSetBadgeNumber = function () {
    LocalNotifications.schedule([{
      id: 3,
      title: 'Hi',
      body: 'You should see a \'3\' somewhere',
      at: new Date(new Date().getTime() + 20*1000),
      badge: 3
    }]).then(
        function() {
          dialogs.alert({
            title: "Notification scheduled",
            message: 'ID: 3',
            okButtonText: "OK, thanks"
          });
        },
        function(error) {
          console.log("doScheduleAndSetBadgeNumber error: " + error);
        }
    )
  };

  DemoAppModel.prototype.doScheduleId5 = function () {
    LocalNotifications.schedule([{
      id: 5,
      title: 'Hey',
      body: 'I\'m ID 5',
      at: new Date(new Date().getTime() + 80*1000)
    }]).then(
        function() {
          dialogs.alert({
            title: "Notification scheduled",
            message: 'ID: 5',
            okButtonText: "OK, thanks"
          });
        },
        function(error) {
          console.log("doScheduleId5 error: " + error);
        }
    )
  };

  DemoAppModel.prototype.doGetScheduledIds = function () {
    LocalNotifications.getScheduledIds().then(
        function(ids) {
          dialogs.alert({
            title: "Scheduled ID's",
            message: 'ID\'s: ' + ids, 
            okButtonText: "Sweet!"
          })
        },
        function(error) {
          console.log("doGetScheduledIds error: " + error);
        }
    )
  };

  DemoAppModel.prototype.doCancelAll = function (sze) {
    LocalNotifications.cancelAll().then(
        function() {
          dialogs.alert({
            title: "All canceled",
            okButtonText: "Awesome!"
          })
        },
        function(error) {
          console.log("doCancelAll error: " + error);
        }
    )
  };

  DemoAppModel.prototype.doCancelId5 = function (sze) {
    LocalNotifications.cancel(5).then(
        function(foundAndCanceled) {
            if (foundAndCanceled) {
                dialogs.alert({
                    title: "ID 5 canceled",
                    okButtonText: "OK, coolness"
                })
            } else {
                dialogs.alert({
                    title: "No ID 5 was scheduled",
                    okButtonText: "OK, woops"
                })
            }
        },
        function(error) {
          console.log("doCancelId5 error: " + error);
        }
    )
  };

  return DemoAppModel;
})(observable.Observable);
exports.DemoAppModel = DemoAppModel;
exports.mainViewModel = new DemoAppModel();

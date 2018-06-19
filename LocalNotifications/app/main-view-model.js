var observable = require("tns-core-modules/data/observable");
var dialogs = require("tns-core-modules/ui/dialogs");
var LocalNotifications = require("nativescript-local-notifications");

var DemoAppModel = (function (_super) {
  __extends(DemoAppModel, _super);
  function DemoAppModel() {
    _super.call(this);
  }

  DemoAppModel.prototype.doAddOnMessageReceivedCallback = function () {
    LocalNotifications.addOnMessageReceivedCallback(
        function (notificationData) {
          dialogs.alert({
            title: "Notification received",
            message: "ID: " + notificationData.id +
                "\nTitle: " + notificationData.title +
                 "\nBody: " + notificationData.body,
            okButtonText: "Excellent!"
          });
        }
    ).then(
        function() {
          dialogs.alert({
            title: "Listener added",
            message: "We'll let you know when a notification is received.",
            okButtonText: "Nice :)"
          });
        }
    );
  };

  DemoAppModel.prototype.doCheckHasPermission = function () {
    LocalNotifications.hasPermission().then(
        function(granted) {
          dialogs.alert({
            title: "Permission granted?",
            message: granted ? "YES" : "NO",
            okButtonText: "OK"
          });
        }
    );
  };

  DemoAppModel.prototype.doRequestPermission = function () {
    LocalNotifications.requestPermission().then(
        function(granted) {
          dialogs.alert({
            title: "Permission granted?",
            message: granted ? "YES" : "NO",
            okButtonText: "OK"
          });
        }
    );
  };

  DemoAppModel.prototype.doSchedule = function () {
    LocalNotifications.schedule([{
      id: 1,
      title: 'The title',
      body: 'The big body. The big body. The big body. The big body. The big body. The big body. The big body. The big body.',
      bigTextStyle: true, // Adds an 'expansion arrow' to the notification (Android only)
      sound: "customsound",
      channel: "My Awesome Channel",
      ticker: 'Special ticker text (Android only)',
      at: new Date(new Date().getTime() + (10*1000))
    }]).then(
        function() {
          dialogs.alert({
            title: "Notification scheduled",
            message: "ID: 1",
            okButtonText: "OK, thanks"
          });
        },
        function(error) {
          console.log("doSchedule error: " + error);
        }
    );
  };

  DemoAppModel.prototype.doScheduleSilent = function () {
    LocalNotifications.schedule([{
      id: 2,
      title: 'Hi',
      body: 'I\'m soundless',
      sound: null,
      at: new Date(new Date().getTime() + 10*1000)
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
    );
  };

  DemoAppModel.prototype.doScheduleAndSetBadgeNumber = function () {
    LocalNotifications.schedule([{
      id: 3,
      title: 'Hi',
      body: 'You should see a \'3\' somewhere',
      at: new Date(new Date().getTime() + 10*1000),
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
    );
  };

  DemoAppModel.prototype.doScheduleId5WithCustomIcon = function () {
    LocalNotifications.schedule([{
      id: 5,
      title: 'Hey',
      body: 'I\'m ID 5',
      smallIcon: 'res://launcher_icon_arrow',
      largeIcon: 'res://ic_notify', // although this is the default fallback as well ;)
      at: new Date(new Date().getTime() + 10*1000)
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
    );
  };

  DemoAppModel.prototype.doScheduleEveryMinute = function () {
    LocalNotifications.schedule([{
      id: 6,
      title: 'Every minute!',
      interval: 'minute', // some constant
      body: 'I\'m repeating until cancelled',
      at: new Date(new Date().getTime() + 10*1000)
    }]).then(
        function() {
          dialogs.alert({
            title: "Notification scheduled",
            message: 'ID: 6, repeating',
            okButtonText: "OK, thanks"
          });
        },
        function(error) {
          console.log("doScheduleEveryMinute error: " + error);
        }
    );
  };

  DemoAppModel.prototype.doGetScheduledIds = function () {
    LocalNotifications.getScheduledIds().then(
        function(ids) {
          dialogs.alert({
            title: "Scheduled ID's",
            message: 'ID\'s: ' + ids,
            okButtonText: "Sweet!"
          });
        },
        function(error) {
          console.log("doGetScheduledIds error: " + error);
        }
    );
  };

  DemoAppModel.prototype.doCancelAll = function (sze) {
    LocalNotifications.cancelAll().then(
        function() {
          dialogs.alert({
            title: "All canceled",
            okButtonText: "Awesome!"
          });
        },
        function(error) {
          console.log("doCancelAll error: " + error);
        }
    );
  };

  DemoAppModel.prototype.doCancelId6 = function (sze) {
    LocalNotifications.cancel(6).then(
        function(foundAndCanceled) {
            if (foundAndCanceled) {
                dialogs.alert({
                    title: "ID 6 canceled",
                    okButtonText: "OK, coolness"
                });
            } else {
                dialogs.alert({
                    title: "No ID 6 was scheduled",
                    okButtonText: "OK, woops"
                });
            }
        },
        function(error) {
          console.log("doCancelId6 error: " + error);
        }
    );
  };

  return DemoAppModel;
})(observable.Observable);
exports.DemoAppModel = DemoAppModel;
exports.mainViewModel = new DemoAppModel();

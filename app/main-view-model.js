var observable = require("data/observable");
var LocalNotifications = require("nativescript-local-notifications");
var dialogs = require("ui/dialogs");
var DemoAppModel = (function (_super) {
  __extends(DemoAppModel, _super);
  function DemoAppModel() {
    _super.call(this);
  }


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
    LocalNotifications.requestPermission().then(
        function() {
          console.log("Permission requested");
        }
    )
  };

  DemoAppModel.prototype.doSchedule = function () {
    LocalNotifications.schedule([{
      id: 1,
      title: 'Hi',
      body: 'Lo',
      at: new Date(new Date().getTime() + (10*1000))
    }]).then(
        function() {
          console.log("Notification scheduled - close the app and within 10 seconds from now you'll see (and hear) it.");
        },
        function(error) {
          console.log("doScheduleSilent error: " + error);
        }
    )
  };

  DemoAppModel.prototype.doScheduleSilent = function () {
    LocalNotifications.schedule([{
      id: 2,
      title: 'Hi',
      body: 'Lo',
      sound: null,
      at: new Date(new Date().getTime() + 10*1000)
    }]).then(
        function() {
          console.log("Silent notification scheduled - close the app and within 10 seconds from now you'll see but won't hear it.");
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
      body: 'Lo',
      at: new Date(new Date().getTime() + 10*1000),
      badgeNumber: 3
    }]).then(
        function() {
          console.log("Silent notification scheduled - close the app and within 10 seconds from now you'll see but won't hear it.");
        },
        function(error) {
          console.log("doScheduleSilent error: " + error);
        }
    )
  };


  DemoAppModel.prototype.doScheduleId5 = function () {
    LocalNotifications.schedule([{
      id: 5,
      title: 'Hey',
      body: 'I\'m ID 5',
      at: new Date(new Date().getTime() + 10*1000)
    }]).then(
        function() {
          console.log("Notification with ID 5 scheduled - close the app and within 10 seconds from now you'll see but won't hear it.");
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
            okButtonText: "OK, thanks"
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
            okButtonText: "OK, awesome"
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

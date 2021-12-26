class PubSubManager {
  constructor() {
    this.channels = [
      {
        id: "",
        message: "",
        subscribers: [],
      },
    ];
    this.brokerId = setInterval(() => {
      this.broker();
    }, 1000);
  }

  subscribe(subscriber, channel, uid) {
    console.log(`subscribing to ${channel}`);
    if (this.channels.find((c) => c.id === channel)) {
      this.channels.find((c) => c.id === channel).subscribers.push(subscriber);
    } else {
      const newChannel = {
        id: channel,
        message: "",
        subscribers: [subscriber],
      };
      this.channels.push(newChannel);
    }
  }

  unsubscribe(subscriber, channel) {
    console.log(`subscribing to ${channel}`);
    if (this.channels.find((c) => c.id === channel)) {
      console.log("Channel found");
      const index = this.channels
        .find((c) => c.id === channel)
        .subscribers.indexOf(subscriber);
      if (index > -1) {
        this.channels
          .find((c) => c.id === channel)
          .subscribers.splice(index, 1);
      }
      console.log("Unsubscribed succesfully");
    }
  }

  removeBroker() {
    clearInterval(this.brokerId);
  }

  publish(publisher, channel, message) {
    console.log("publish");
    if (this.channels.find((c) => c.id === channel)) {
      this.channels.find((c) => c.id === channel).message = message;
    }
  }

  broker() {
    for (const channel in this.channels) {
      if (this.channels.hasOwnProperty(channel)) {
        const channelObj = this.channels[channel];
        if (channelObj.message) {
          console.log(`found message: ${channelObj.message} in ${channel}`);

          channelObj.subscribers.forEach((subscriber) => {
            subscriber.send(
              JSON.stringify({
                message: channelObj.message,
              })
            );
          });
          channelObj.message = "";
        }
      }
    }
  }
}
module.exports = PubSubManager;

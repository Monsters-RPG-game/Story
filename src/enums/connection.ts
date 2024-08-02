export enum EMessageTypes {
  Error = 'error',
  Credentials = 'credentials',
  Send = 'send',
  Heartbeat = 'heartbeat',
}

export enum ERabbit {
  RetryLimit = 10,
}

export enum EServices {
  Gateway = 'gateway',
  Story = 'story',
}

export enum EAmqQueues {
  Gateway = 'gatewayQueue',
  Story = 'storyQueue',
}

export enum EMessageTargets {
  NpcStory = 'npcStory',
  NarratorStory = 'narratorStory',
  UserCompletion = 'userCompletion',
}

const Emitter = function(){
  this.listeners = {};
};

Emitter.prototype.on = function(subject, cb){
  this.listeners[subject] = cb;
};

Emitter.prototype.off = function(subject){
  delete this.listeners[subject];
};

Emitter.prototype.trigger = function(subject, ...args){
  this.listeners[subject] && this.listeners[subject].apply(null, args);
};

Emitter.prototype.emit = function(subject, ...args){
  return (...args2) => {
    this.trigger(subject, ...args.concat(args2));
  };
};

export const events = new Emitter();

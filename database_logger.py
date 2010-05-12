import datetime
from elixir import *
from elixir.options import using_options

metadata.bind = "sqlite:///logger.sqlite"
metadata.bind.echo = True

class Channel(Entity):
    name = Field(Unicode(30), unique=True)
    messages = OneToMany('Message')

    def __repr__(self):
        return "<Channel %s>" % self.name

class Message(Entity):
    user = Field(Unicode(30))
    channel = ManyToOne('Channel')
    message = Field(UnicodeText)
    timestamp = Field(DateTime, default=datetime.datetime.now)

    def __repr__(self):
        return "<Message from %s>" % self.user

# Message Handler
def log_message(bot, user, channel_name, msg, groups):
    setup_all(True)
    user = user.split('!')[0]
    if channel_name[0] != '#': # notice or direct message
        return
    chan = Channel.get_by(name=channel_name)
    if not chan:
        chan = Channel(name=channel_name)
    Message(user=user, channel=chan, message=msg)
    session.commit()

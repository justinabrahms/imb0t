import datetime, time
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

    @property
    def pretty_date(self):
        return time.strftime('%H:%M on %m/%d/%y', self.timestamp.timetuple())

    def __repr__(self):
        return "<Message from %s>" % self.user

# Message Handler
def log_message(bot, user, channel_name, msg, groups):
    if channel_name[0] != '#': # notice or direct message
        return
    user = user.split('!')[0]
    channel_name = channel_name.lstrip('#')
    setup_all(True)
    chan = Channel.get_by(name=channel_name)
    if not chan:
        chan = Channel(name=channel_name)
    Message(user=user, channel=chan, message=msg)
    session.commit()

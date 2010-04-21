import os
import re
import sys
from twisted.words.protocols import irc
from twisted.internet import protocol, reactor
from patterns import pattern_list

class IMBot(irc.IRCClient):
    def signedOn(self):
        for chan in self.factory.channel_list:
            self.join(chan)

    def _get_nickname(self):
        return self.factory.nickname
    nickname = property(_get_nickname)

    def privmsg(self, user, channel, msg):
        for regex, func in pattern_list:
            match = regex.search(msg)
            if match:
                func(self, user, channel, msg, match.groups())

class IMBotFactory(protocol.ClientFactory):
    protocol = IMBot

    def __init__(self, channel_list, nickname='imb0t'):
        self.channel_list = channel_list
        self.nickname = nickname
        self.JIRA_regex = re.compile(r'([A-Z]{2,4}-[0-9]+)')

    def clientConnectionLost(self, connector, reason):
        print "Lost connection (%s), reconnecting." % (reason,)
        connector.connect()

    def clientConnectionFailed(self, connector, reason):
        print "Could not connect: %s" % (reason,)


if __name__ == '__main__':
    chan_list = sys.argv[1:]
    reactor.connectTCP('irc.freenode.net', 6667, IMBotFactory(['#%s' % chan for chan in chan_list]))
    reactor.run()

def handle_jira(bot, user, channel, msg, groups):
    for match in groups:
        bot.say(channel, "http://jira.invitemedia.com/browse/%s" % match)

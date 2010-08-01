def handle_jira(bot, user, channel, msg, groups):
    for match in groups:
        ticket_url = "http://jira.invitemedia.com/browse/%s" % match
        bot.say(channel, ticket_url)
        

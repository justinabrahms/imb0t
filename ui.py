from flask import Flask, render_template, abort
from elixir import setup_all
from database_logger import Channel, Message

app = Flask(__name__)
app.debug = True

@app.route('/')
def index():
    setup_all(True)
    channel_list = Channel.query.all()
    return render_template('index.html', channel_list=channel_list)

@app.route('/<channel>/')
def channel_detail(channel):
    if 'favicon' in channel:
        abort(404)
    setup_all(True)
    chan = Channel.get_by(name=channel)
    return render_template('channel_detail.html',
                           message_list=chan.messages,
                           channel=chan)

if __name__ == '__main__':
    app.run()

from app.seeds.comments import seed_comments
from flask.cli import AppGroup
from .users import seed_users, undo_users
from .pictures import seed_pics, undo_pics
from .albums import seed_albums, undo_albums
from .comments import seed_comments, undo_comments

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_pics()
    seed_albums()
    seed_comments()
    # Add other seed functions here



# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_pics()
    undo_albums()
    undo_comments()
    # Add other undo functions here

#!/bin/bash

# This command will synchronize the local web/ directory to the remote
# www/stage.gp-winterthur.ch/ directory on the server winterthur-marathon.ch,
# making the remote directory an exact copy of the local one
# -a: This option enables the archive mode, which allows copying files recursively
#     and it also preserves symbolic links, file permissions, user & group ownerships,
#     and timestamps.
# --delete: This option deletes files that are not in the source directory from the
#     destination directory. This ensures that the destination only contains files
#     that match the source.
rsync -a --delete web/ winterthur-marathon.ch:www/stage.gp-winterthur.ch/

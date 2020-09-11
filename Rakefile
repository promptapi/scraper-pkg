# helper functions...
# -----------------------------------------------------------------------------
def is_repo_clean?
  current_branch = `git rev-parse --abbrev-ref HEAD`.strip
  any_changes = `git status -s | wc -l`.strip.to_i
  if any_changes == 0
    true
  else
    false
  end
end

def command_exists?(cmd)
  cmd_check = `command -v #{cmd} > /dev/null 2>&1 && echo $?`.chomp
  cmd_check.length == 0 ? false : true
end

def current_version(lookup_file=".bumpversion.cfg")
  file = File.open(lookup_file, "r")
  data = file.read
  file.close
  match = /current_version = (\d+).(\d+).(\d+)/.match(data)
  "#{match[1]}.#{match[2]}.#{match[3]}"
end
# -----------------------------------------------------------------------------


# tasks
# -----------------------------------------------------------------------------
AVAILABLE_REVISIONS = ["major", "minor", "patch"]
desc "Bump revision: #{AVAILABLE_REVISIONS.join(',')}, default: patch"
task :bump, [:revision] do |_, args|
  args.with_defaults(revision: "patch")
  abort "bumpversion command not found..." unless command_exists?("bumpversion")
  abort "Please provide valid revision: #{AVAILABLE_REVISIONS.join(',')}" unless AVAILABLE_REVISIONS.include?(args.revision)

  system "bumpversion #{args.revision}"
end

namespace :publish do
  desc "Publish package to NPM"
  task :npm do
    system %{
      npmrc default &&
      npm publish
    }
  end

  desc "Publish package to GitHub"
  task :github do
    system %{
      npmrc github &&
      npm publish
    }
  end
end
# -----------------------------------------------------------------------------

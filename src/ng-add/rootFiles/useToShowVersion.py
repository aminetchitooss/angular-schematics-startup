import json

with open("src/assets/app.settings.json", "r") as f:
    setting = json.load(f)


class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


print(f"\n \t{bcolors.BOLD}{bcolors.UNDERLINE}The new version deployed is {bcolors.ENDC}{bcolors.OKGREEN} => {bcolors.ENDC}{bcolors.OKCYAN}{bcolors.BOLD}" +
      setting["version"]+f"{bcolors.ENDC}\n")

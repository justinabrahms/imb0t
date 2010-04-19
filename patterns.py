import re

def pattern(regexp, callable_path):
    func_name = callable_path.split('.')[-1]
    module_name = '.'.join(callable_path.split('.')[:-1])
    module = __import__(module_name)
    func = getattr(module, func_name)
    return (re.compile(regexp), func)

pattern_list = (
    pattern(r'([A-Z]+-[0-9]+)', 'basic.handle_jira'),
)

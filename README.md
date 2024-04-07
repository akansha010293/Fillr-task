# Dynamic Form Field extraction

This script is designed to extract form fields from a web page and communicate them to the top frame in a cross-origin iframe scenario. It can be used in situations where you need to collect form data from multiple iframes and aggregate
them in the top frame.

# How it works?

- The script starts by running the top file where its collecting data from fields ('input,'select','textarea') from the top file followed by child frame.
- Once top file listens to the message from clid frames, it sends the extracted field from child to parent frame.
- Once all field is collected we check with the value in NUMBER_OF_FIELDS and sort the name alphabatically by field name and dispatch a custom event to notify the parent frame
  Notes:

- Only edit the widget.js file!
- You should use postMessage to communicate between iframes.
- The frame documents should not be edited.
- The test case should not be changed.
- Karma config should not be edited.
- The test must pass 100% of the times it is run (assuming no network errors).

# Customisation

- We can customize the NUMBER_OF_FIELDS heuristic to better suit your application's needs.
- `postMessage({ type: "fields", fields }, "*");` Would have specified target location due to not \*, when using postMessage to send data to other windows. As a malicious site can change the location of the window without your knowledge, and therefore it can intercept the data sent using postMessage.
- Implemented few tests using copilot, we can implement them using karma

## Submission

Please submit your code test in a public Github repo and notify mujtaba.hussain@rakuten.com when you are complete!

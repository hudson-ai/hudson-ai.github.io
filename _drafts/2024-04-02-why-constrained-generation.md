---
layout: default
title:  "Constrained Generation"
date:   2024-04-02 10:48:12 -0700

categories: genai
---

# Generative AI has a problem.
GenAI models in general, and LLMs in particular, are "text-in text-out".

Why is this a problem? Putting myself at risk of angering the UNIX nerds out there... _text doesn't compose_. Well, _unstructured_ text doesn't compose.

The "Please Monad"
str -> Please(address)

What do I mean by that?

Say we have a document that contains one or more street addresses, and we want to "extract" those addresses so we can send each one a postcard.

> In the bustling city of Sydney, the address P. Sherman, 42 Wallaby Way holds a special place in the hearts of "Finding Nemo" fans. It's the fictional but beloved destination where Marlin, a determined clownfish, embarks on an epic journey across the ocean to find his son, Nemo. This whimsical address has since become synonymous with adventure and the unbreakable bonds of family.

So, let's ask our friendly GenAI assistant to list the address(es) in the text:

> The address in the text is "P. Sherman, 42 Wallaby Way" in Sydney. This address is fictional and is well-known from the movie "Finding Nemo."

We're no better off than when we started.

The "traditional" approach at this point would be to come up with a better prompt. For example, we can ask the LLM to give the addresses in a newline-delimited list with no additional text besides the addresses.

> P. Sherman, 42 Wallaby Way, Sydney

Better, but we still have a problem.

To actually send our postcards, we need to send a POST request (see what I did there?) to an API which expects requests to follow a specific JSON schema:

```json
{
    "address_name": "P. Sherman",
    "address_line_1": "42 Wallaby Way",
    "address_line_2": null,
    "address_city": "Sydney",
    "address_country": "AU"
}
```

Again, the "traditional" approach is to come up with a better prompt that specifies the JSON schema we are expecting the LLM's outputs to conform to. I'll call this approach _"Asking Nicely."_

# Asking Nicely has a problem.

When we _Ask Nicely_, we get zero guarantees. 

For one, we have no guarantee that the output will be JSON parsable -- there could be a dropped comma, a missing curly brace, or a rambling preamble about _how pleased the model is that it could help us with our task_.

Even if the model gets the JSON syntax right, we have no guarantee that it will actually conform to our schema. Maybe through some smart prompting, we can get fairly reliable outputs. But given a brand new document to parse, we cannot guarantee any kind of conformity.

Are we stuck hand-addressing letters forever?

# Solution 1: Validation
TODO

# Solution 2: Constrained Generation
TODO
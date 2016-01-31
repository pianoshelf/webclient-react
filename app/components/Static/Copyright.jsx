
import Helmet from 'react-helmet';
import Markdown from 'react-markdown';
import React from 'react';

const input = `

# DMCA Policy

## Digital Millenium Copyright Act

  Pianoshelf respects the intellectual property rights of others and expects its users to do the
same. In accordance with the Digital Millennium Copyright Act of 1998, the text of which may be
found on the U.S. Copyright Office website [here](http://www.copyright.gov/legislation/dmca.pdf),
Pianoshelf will respond expeditiously to claims of copyright infringement committed using the
Pianoshelf service that are reported to the Pianoshelf Designated Copyright Agent identified in the
sample notice below.

  If you are a copyright owner, authorized to act on behalf of one or authorized to act under any
exclusive right under copyright, please report alleged copyright infringements taking place on or
through the PianoShelf services (the "Services") by completing the following DMCA Notice of Alleged
Infringement and delivering it to the PianoShelf Designated Copyright Agent. Upon receipt of Notice
as described below, PianoShelf will take whatever action, in its sole discretion, it deems
appropriate, including removal of the challenged use from the Services and/or termination of the
PianoShelf user's account.

### DMCA Notice of Alleged Infringement ("Notice")

* Identify the copyrighted work that you claim has been infringed, or - if multiple copyrighted
  works are covered by this Notice - you may provide a representative list of the copyrighted works
  that you claim have been infringed.
* Identify the material or link you claim is infringing (or the subject of infringing activity) and
  that access to which is to be disabled, including at a minimum, if applicable, the URL of the link
  shown on the relevant website where such material may be found.
* Provide your mailing address, telephone number, and, if available, email address.
* Include both of the following statements in the body of the Notice:
  * "I hereby state that I have a good faith belief that the disputed use of the copyrighted
    material is not authorized by the copyright owner, its agent, or the law (e.g., as a fair use)."
  * "I hereby state that the information in this Notice is accurate and, under penalty of perjury,
    that I am the owner, or authorized to act on behalf of the owner, of the copyright or of an
    exclusive right under the copyright that is allegedly infringed."
* Provide your full legal name and your electronic or physical signature.

Deliver this Notice, with all items completed, to PianoShelf's Designated Copyright Agent:

PianoShelf Copyright Agent<br />
[admin@pianoshelf.com](mailto:admin@pianoshelf.com)

### What if, as a user of the Service, I receive a Copyright Complaint (DMCA) notification?

If you receive a notification that a sheetmusic has been removed due a copyright complaint, it means
that the sheetmusic's content has been deleted from PianoShelf at the request of the content's
owner. If you want us to forward the information from the Copyright Complaint notification, just
reply to the notification to let us know. We'll be happy to send it along (without any personal
contact information). If your account receives too many copyright complaints, you may lose the
ability to add sheetmusic on PianoShelf, and your account may be disabled completely. If you believe
a sheetmusic was removed in error, you have the option to file a counter-notice by following the
steps below. When we receive a valid counter-notice, we will forward a copy to the person who filed
the original complaint. If we do not receive notice within 10 business days that the submitter of
the original complaint is seeking a court order to prevent further infringement of the content at
issue, we will remove the complaint from your account's record, and we may replace the content that
was removed. Note: There are legal and financial consequences for fraudulent and/or bad faith
submissions. Before submitting a counter-notice, be sure that you are the actual rights holder of
the removed content or that you have a good faith belief that the material was removed in error, and
understand the repercussions of submitting a false claim.

### How to File a Counter-Notice

1. Reply to the notification email you receive.
2. Include ALL of the following:
   * Your name, address, and telephone number.
   * DMCA ID printed at the bottom of the notification email.
   * The source address of the content that was removed (copy and paste the link in the notification
     email).
   * A statement under penalty of perjury that you have a good faith belief that the content was
     removed in error.
   * A statement that you consent to the jurisdiction of Federal District Court for the judicial
     district in which the address is located, or if your address is outside of the United States,
     for any judicial district in which Atavist may be found, and that you will accept service of
     process from the person who provided the original complaint under subsection (c)(1)(C) or an
     agent of such person.
   * A physical or electronic signature (for example, typing your full name).

`;

export default function Copyright() {
  return (
    <div>
      <Helmet title="Copyright" />
      <Markdown className="static__markdown" source={input} />
    </div>
  );
}

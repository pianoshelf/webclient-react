
import Helmet from 'react-helmet';
import Markdown from 'react-markdown';
import React from 'react';

const input = `

# Terms of Service

## 1. Terms

By accessing this website, you are agreeing to be bound by these web site Terms and Conditions of
Use, all applicable laws and regulations, and agree that you are responsible for compliance with any
applicable local laws. If you do not agree with any of these terms, you are prohibited from using or
accessing this site. The materials contained in this web site are protected by applicable copyright
and trade mark law, unless otherwise specified.

## 2. Use License

Permission is granted to temporarily download one copy of the materials (information or software) on
Pianoshelf's web site for personal, non-commercial transitory viewing only. This is the grant of a
license, not a transfer of title, and under this license you may not:

* modify or copy the materials;
* use the materials for any commercial purpose, or for any public display (commercial or
  non-commercial);
* attempt to decompile or reverse engineer any software contained on Pianoshelf's web site;
* remove any copyright or other proprietary notations from the materials;
* transfer the materials to another person or "mirror" the materials on any other server;
* This license shall automatically terminate if you violate any of these restrictions and may be
  terminated by Pianoshelf at any time. Upon terminating your viewing of these materials or upon the
  termination of this license, you must destroy any downloaded materials in your possession whether
  in electronic or printed format.

## 3. Disclaimer

The materials and information on Pianoshelf's web site are user-generated and provided "as is".
Pianoshelf makes no warranties, expressed or implied, and hereby disclaims and negates all other
warranties, including without limitation, implied warranties or conditions of merchantability,
fitness for a particular purpose, or non-infringement of intellectual property or other violation of
rights. Further, Pianoshelf does not warrant or make any representations concerning the accuracy,
likely results, or reliability of the use of the materials on its Internet web site or otherwise
relating to such materials or on any sites linked to this site.

## 4. Limitations

In no event shall Pianoshelf or its suppliers be liable for any damages (including, without
limitation, damages for loss of data or profit, or due to business interruption) arising out of the
use or inability to use the materials on Pianoshelf's Internet site, even if Pianoshelf or a
Pianoshelf authorized representative has been notified orally or in writing of the possibility of
such damage. Because some jurisdictions do not allow limitations on implied warranties, or
limitations of liability for consequential or incidental damages, these limitations may not apply to
you.

## 5. Revisions and Errata

The materials appearing on Pianoshelf's web site could include technical, typographical, or
photographic errors. Pianoshelf does not warrant that any of the materials on its web site are
accurate, complete, or current. Pianoshelf may make changes to the materials contained on its web
site at any time without notice. Pianoshelf does not, however, make any commitment to update the
materials.

## 6. Links

Pianoshelf has not reviewed all of the sites linked to its Internet web site and is not responsible
for the contents of any such linked site. The inclusion of any link does not imply endorsement by
Pianoshelf of the site. Use of any such linked web site is at the user's own risk. All images and/or
videos that appear on the site are copyright their respective owners and Pianoshelf claims no credit
for them unless otherwise noted. If you own the rights to any of the images and/or videos and do not
wish them to appear on the site, please contact us at
[admin@pianoshelf.com](mailto:admin@pianoshelf.com) and they will be promptly removed.

## 7. Site Terms of Use Modifications

Pianoshelf may revise these terms of use for its web site at any time without notice. By using this
web site you are agreeing to be bound by the then current version of these Terms and Conditions of
Use.

`;

export default function TermsOfService() {
  return (
    <div>
      <Helmet title="Terms of Service" />
      <Markdown className="static__markdown" source={input} />
    </div>
  );
}

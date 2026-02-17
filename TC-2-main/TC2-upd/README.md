<img width="150px" src="https://www.nscc.ca/img/aboutnscc/visual-identity-guidelines/artwork/nscc-jpeg.jpg" >

# PROG 2700 - Tech Check 2 

**Value:** 7.5% of overall course mark  
**Time to complete:** 1 hour

## Bioinformatics 101

### Step 1 - Convert DNA Sequence to corresponding Codon Sequence
The DNA code is comprised of four letters: G, T, A, and C. In a strand of DNA, each triplet of these letters is a *codon*. Each codon represents an amino acid. Your first task in this tech check is to convert a DNA sequence – stored as a string – into the corresponding sequence of codons. 

So, for example, the following DNA sequence string: GCTCGTAATGATTGT should be converted into the following codon sequence: **["GCT","CGT","AAT","GAT","TGT"]**.

There are 21 amino acids. The DNA codons that represent them and their abbreviations are specified in the following table. This same data is available as a JSON file at  
https://prog2700.onrender.com/dna/

Abbr.| | DNA Codons | Amino Acid
--- |--- |--- | ---
|Ala | |GCT, GCC, GCA, GCG | Alanine |
|Arg | |CGT, CGC, CGA, CGG, AGA, AGG | Arginine |
|Asn | |AAT, AAC | Asparagine |
|Asp | |GAT, GAC | Aspartic Acid |
|Cys | |TGT, TGC | Cysteine |
|Gln | |CAA, CAG | Glutamine |
|Glu | |GAA, GAG | Glutamic acid |
|Gly | |GGT, GGC, GGA, GGG | Glycine |
|His | |CAT, CAC | Histidine |
|Ile | |ATT, ATC, ATA | Isoleucine |
|Leu | |CTT, CTC, CTA, CTG, TTA, TTG | Leucine |
|Lys | |AAA, AAG | Lysine |
|Met | |ATG | Methionine |
|Phe | |TTT, TTC | Phenylalanine |
|Pro | |CCT, CCC, CCA, CCG | Proline |
|Pyl | |UAG | Pyrrolysine |
|Ser | |TCT, TCC, TCA, TCG, AGT, AGC | Serine |
|Sec | |UGA | Selenocysteine |
|Thr | |ACT, ACC, ACA, ACG | Threonine |
|Trp | |TGG | Tryptophan |
|Tyr | |TAT, TAC | Tyrosine |
|Val | |GTT, GTC, GTA, GTG | Valine |


### Step 2 - Convert your codon sequence into an amino acid sequence
A protein is just a chain of amino acids - otherwise known as a *polypeptide*. Your job, now that you've translated the DNA sequence into a codon sequence, is to translate that codon sequence into an amino acid sequence. Imagine doing that by hand using the above table.

#### Submission Instructions

Once your program is complete, or if you run out of in-class time to complete the Tech Check, commit and push your code to GitHub with the commit message "End of Class"

If you complete the Tech Check outside of class time, commit and push your subsequent code additions and changes with a message or "Ready for Marking"

#### Marking Scheme
Final Grade | Requirement
:---: | ---
|**10/10** | Tech check is correct (passes all tests) and is completed within the allotted in-class time.
|**8/10** | Tech check is correct (passes all tests) and is completed within a 12-hour grace period beginning immediately following the end of in-class time.
|**6/10** | Tech check is correct (passes all tests) and is completed and submitted after the 12-hour grace period has elapsed.
|**0/10** | Tech check is not submitted or does not pass all tests.

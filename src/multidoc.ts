import type { MetadataHistoryEvent, MetadataTemplate } from './data';
import type { RecordFile } from './membership';

export type RecordDocument = {
  id: string;
  name: string;
  addedUtc: number;
  owner: string;
  onHold?: boolean;
  metadata: MetadataTemplate[];
  history: MetadataHistoryEvent[];
};

const applied = (
  timeUtc: string,
  actor: string,
  template: string,
  attribute: string,
  newValue: string,
): MetadataHistoryEvent => ({
  timeUtc,
  actor,
  template,
  attribute,
  operation: 'applied',
  previousValue: '',
  newValue,
});

export const RECORD_NAMES: Record<number, string> = {
  1001: 'Northwind Q3 invoice',
  1002: 'Helios vendor invoice',
  1004: 'October close',
  1005: 'FY22 year-end packet',
  1006: 'Brightline MSA',
  1008: 'Cedar office supply',
};

const DOCUMENTS: Record<number, RecordDocument[]> = {
  1001: [
    {
      id: 'doc-1001-invoice',
      name: 'Q3 Invoice.pdf',
      addedUtc: Date.parse('2024-02-01T16:04:00Z'),
      owner: 'Avery Chen',
      metadata: [
        {
          name: 'Vendor Invoice',
          attributes: [
            { label: 'Vendor name', value: 'Northwind Supplies' },
            { label: 'Invoice number', value: 'INV-2024-1184' },
            { label: 'Amount', value: '18420.00' },
          ],
        },
      ],
      history: [
        applied('2024-02-01T16:04:00Z', 'Avery Chen', 'Vendor Invoice', 'Invoice number', 'INV-2024-1184'),
        applied('2024-02-01T16:04:00Z', 'Avery Chen', 'Vendor Invoice', 'Amount', '17900.00'),
        {
          timeUtc: '2025-11-02T18:12:00Z',
          actor: 'Jordan Lee',
          template: 'Vendor Invoice',
          attribute: 'Amount',
          operation: 'edited',
          previousValue: '17900.00',
          newValue: '18420.00',
        },
      ],
    },
    {
      id: 'doc-1001-receipt',
      name: 'Northwind receipt.pdf',
      addedUtc: Date.parse('2024-02-02T18:10:00Z'),
      owner: 'Avery Chen',
      metadata: [
        {
          name: 'Receipt',
          attributes: [
            { label: 'Receipt number', value: 'R-88421' },
            { label: 'Paid date', value: 'Feb 2, 2024' },
          ],
        },
      ],
      history: [applied('2024-02-02T18:10:00Z', 'Avery Chen', 'Receipt', 'Receipt number', 'R-88421')],
    },
    {
      id: 'doc-1001-slip',
      name: 'Packing slip.pdf',
      addedUtc: Date.parse('2026-10-01T15:00:00Z'),
      owner: 'Jordan Lee',
      metadata: [
        {
          name: 'Shipment',
          attributes: [
            { label: 'Carrier', value: 'Box Freight' },
            { label: 'Cartons', value: '3' },
          ],
        },
      ],
      history: [applied('2026-10-01T15:00:00Z', 'Jordan Lee', 'Shipment', 'Carrier', 'Box Freight')],
    },
  ],
  1002: [
    {
      id: 'doc-1002-invoice',
      name: 'Vendor Contract Invoice.pdf',
      addedUtc: Date.parse('2023-11-12T16:04:00Z'),
      owner: 'Jordan Lee',
      metadata: [
        {
          name: 'Vendor Invoice',
          attributes: [
            { label: 'Vendor name', value: 'Helios Partners' },
            { label: 'Invoice number', value: 'INV-2023-0441' },
            { label: 'Amount', value: '9600.00' },
          ],
        },
      ],
      history: [applied('2023-11-12T16:04:00Z', 'Jordan Lee', 'Vendor Invoice', 'Invoice number', 'INV-2023-0441')],
    },
    {
      id: 'doc-1002-statement',
      name: 'Helios statement.pdf',
      addedUtc: Date.parse('2024-01-09T17:00:00Z'),
      owner: 'Jordan Lee',
      onHold: true,
      metadata: [
        {
          name: 'Matter',
          attributes: [
            { label: 'Matter ID', value: 'LH-9' },
            { label: 'Outside counsel', value: 'Ortiz LLP' },
          ],
        },
      ],
      history: [applied('2024-01-09T17:00:00Z', 'Jordan Lee', 'Matter', 'Matter ID', 'LH-9')],
    },
    {
      id: 'doc-1002-note',
      name: 'Counsel note.pdf',
      addedUtc: Date.parse('2026-04-03T15:45:00Z'),
      owner: 'Avery Chen',
      metadata: [
        {
          name: 'Counsel note',
          attributes: [
            { label: 'Author', value: 'Ortiz LLP' },
            { label: 'Subject', value: 'Hold scope' },
          ],
        },
      ],
      history: [applied('2026-04-03T15:45:00Z', 'Avery Chen', 'Counsel note', 'Subject', 'Hold scope')],
    },
  ],
  1004: [
    {
      id: 'doc-1004-close',
      name: 'October close.pdf',
      addedUtc: Date.parse('2024-06-15T16:04:00Z'),
      owner: 'Avery Chen',
      metadata: [
        {
          name: 'Vendor Invoice',
          attributes: [
            { label: 'Invoice number', value: 'INV-2024-2201' },
            { label: 'Amount', value: '412.55' },
          ],
        },
      ],
      history: [applied('2024-06-15T16:04:00Z', 'Avery Chen', 'Vendor Invoice', 'Invoice number', 'INV-2024-2201')],
    },
    {
      id: 'doc-1004-sheet',
      name: 'Close worksheet.xlsx',
      addedUtc: Date.parse('2024-06-16T16:00:00Z'),
      owner: 'Avery Chen',
      metadata: [
        {
          name: 'Workbook',
          attributes: [
            { label: 'Sheets', value: 'Close, Tie-out' },
            { label: 'Prepared by', value: 'Avery Chen' },
          ],
        },
      ],
      history: [applied('2024-06-16T16:00:00Z', 'Avery Chen', 'Workbook', 'Sheets', 'Close, Tie-out')],
    },
  ],
  1005: [
    {
      id: 'doc-1005-packet',
      name: 'Year-end packet.pdf',
      addedUtc: Date.parse('2022-01-08T17:04:00Z'),
      owner: 'Jordan Lee',
      metadata: [
        {
          name: 'Vendor Invoice',
          attributes: [
            { label: 'Invoice number', value: 'INV-2022-0088' },
            { label: 'Amount', value: '27500.00' },
          ],
        },
      ],
      history: [applied('2022-01-08T17:04:00Z', 'Jordan Lee', 'Vendor Invoice', 'Invoice number', 'INV-2022-0088')],
    },
    {
      id: 'doc-1005-schedule',
      name: 'Supporting schedule.xlsx',
      addedUtc: Date.parse('2022-01-09T18:00:00Z'),
      owner: 'Jordan Lee',
      metadata: [
        {
          name: 'Workbook',
          attributes: [
            { label: 'Fiscal year', value: '2022' },
            { label: 'Prepared by', value: 'Jordan Lee' },
          ],
        },
      ],
      history: [applied('2022-01-09T18:00:00Z', 'Jordan Lee', 'Workbook', 'Fiscal year', '2022')],
    },
    {
      id: 'doc-1005-memo',
      name: 'Approval memo.pdf',
      addedUtc: Date.parse('2025-12-02T16:30:00Z'),
      owner: 'Avery Chen',
      metadata: [
        {
          name: 'Memo',
          attributes: [
            { label: 'Subject', value: 'Year-end approval' },
            { label: 'Author', value: 'Avery Chen' },
          ],
        },
      ],
      history: [applied('2025-12-02T16:30:00Z', 'Avery Chen', 'Memo', 'Subject', 'Year-end approval')],
    },
  ],
  1006: [
    {
      id: 'doc-1006-contract',
      name: 'Open contract.pdf',
      addedUtc: Date.parse('2025-03-03T17:04:00Z'),
      owner: 'Riley Patel',
      metadata: [
        {
          name: 'Contract Terms',
          attributes: [
            { label: 'Counterparty', value: 'Brightline LLC' },
            { label: 'Contract number', value: 'MSA-2025-017' },
            { label: 'Auto renew', value: 'Yes' },
          ],
        },
      ],
      history: [applied('2025-03-03T17:04:00Z', 'Riley Patel', 'Contract Terms', 'Contract number', 'MSA-2025-017')],
    },
    {
      id: 'doc-1006-amendment',
      name: 'Amendment 1.pdf',
      addedUtc: Date.parse('2025-06-01T15:00:00Z'),
      owner: 'Riley Patel',
      metadata: [
        {
          name: 'Amendment',
          attributes: [
            { label: 'Amendment number', value: '1' },
            { label: 'Effective date', value: 'Jun 1, 2025' },
          ],
        },
      ],
      history: [applied('2025-06-01T15:00:00Z', 'Riley Patel', 'Amendment', 'Amendment number', '1')],
    },
    {
      id: 'doc-1006-exhibit',
      name: 'Exhibit A.pdf',
      addedUtc: Date.parse('2025-06-01T15:05:00Z'),
      owner: 'Riley Patel',
      metadata: [
        {
          name: 'Exhibit',
          attributes: [
            { label: 'Exhibit', value: 'A' },
            { label: 'Title', value: 'Services' },
          ],
        },
      ],
      history: [applied('2025-06-01T15:05:00Z', 'Riley Patel', 'Exhibit', 'Title', 'Services')],
    },
  ],
  1008: [
    {
      id: 'doc-1008-invoice',
      name: 'Unscheduled invoice.pdf',
      addedUtc: Date.parse('2026-07-01T16:04:00Z'),
      owner: 'Avery Chen',
      metadata: [
        {
          name: 'Vendor Invoice',
          attributes: [
            { label: 'Vendor name', value: 'Cedar Office Supply' },
            { label: 'Invoice number', value: 'INV-2026-009' },
            { label: 'Amount', value: '250.00' },
          ],
        },
      ],
      history: [applied('2026-07-01T16:04:00Z', 'Avery Chen', 'Vendor Invoice', 'Invoice number', 'INV-2026-009')],
    },
  ],
};

export function recordName(file: RecordFile): string {
  return RECORD_NAMES[file.id] ?? file.name;
}

export function recordDocuments(fileId: number): RecordDocument[] {
  return DOCUMENTS[fileId] ?? [];
}

const LATER_CHANGES: Record<number, number> = {
  1006: Date.parse('2026-09-01T16:20:00Z'),
};

export function recordLastUpdated(file: RecordFile): number | undefined {
  const times = [file.lastUpdatedUtc, LATER_CHANGES[file.id], ...recordDocuments(file.id).map((document) => document.addedUtc)].filter(
    (time): time is number => time != null,
  );
  if (times.length === 0) return file.lastUpdatedUtc;
  return Math.max(...times);
}

export function recordOnHold(file: RecordFile): boolean {
  return file.holdIds.length > 0 || recordDocuments(file.id).some((document) => document.onHold);
}

export function heldDocumentNames(fileId: number): string[] {
  return recordDocuments(fileId).filter((document) => document.onHold).map((document) => document.name);
}

export function documentActivity(document: RecordDocument): { updatedUtc: number; updatedBy: string } {
  const latest = document.history.slice().sort((a, b) => b.timeUtc.localeCompare(a.timeUtc))[0];
  if (!latest) return { updatedUtc: document.addedUtc, updatedBy: document.owner };
  const updatedUtc = Date.parse(latest.timeUtc);
  return {
    updatedUtc: Number.isNaN(updatedUtc) ? document.addedUtc : updatedUtc,
    updatedBy: latest.actor,
  };
}

export function matchesDocumentQuery(file: RecordFile, query: string): boolean {
  if (!query) return true;
  const haystack = [recordName(file), ...recordDocuments(file.id).map((document) => document.name)];
  return haystack.some((value) => value.toLowerCase().includes(query));
}

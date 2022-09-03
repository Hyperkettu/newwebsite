import { WeightTrackerClient } from "./client";

let client: WeightTrackerClient = null; 

export async function main() {
    console.log('App starting...');
    client = new WeightTrackerClient();
    await client.init();
}

export function editRow() {
    const weightResult = client.getUpdatedWeightResult();
    client.closeEditWindow();
    client.requestOnWeightResult(weightResult.id, weightResult.weight, 'update');
}

export function addResult() {
    client.sendValuesToServer();
}

export function openEditWindow(id: number) {
    client.openEditWindow(id);
}

export function closeEditWindow() {
    client.closeEditWindow();
}

export function closeConfirmRemoveWindow() {
    client.closeConfirmRemoveWindow();
}

export function openConfirmRemoveWindow(id: number) {
    client.openConfirmRemoveWindow(id);
}

export function confirmDelete() {
    client.removeSelectedRow();
    client.closeConfirmRemoveWindow();
}
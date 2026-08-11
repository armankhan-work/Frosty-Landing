"use client";

import React, { useState } from "react";
import { Modal } from "./Modal";
import { Button } from "./Button";

export type ConfirmModalProps = {
  show?: boolean;
  isOpen?: boolean;
  title: string;
  message?: string;
  description?: string;
  icon?: React.ReactNode;
  tone?: "primary" | "danger" | "warning";
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
  onClose?: () => void;
};

export function ConfirmModal({
  show,
  isOpen,
  title,
  message,
  description,
  icon,
  tone = "primary",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  onClose,
}: ConfirmModalProps) {
  const [loading, setLoading] = useState(false);
  const visible = show ?? isOpen ?? false;
  const handleClose = onCancel ?? onClose ?? (() => {});

  if (!visible) return null;

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={visible} onOpenChange={(v) => { if (!v) handleClose(); }} title={title}>
      <div style={{ padding: "8px 0" }}>
        {icon && <div style={{ marginBottom: 12 }}>{icon}</div>}
        <p style={{ fontSize: 14, color: "var(--muted-foreground, #64748B)", margin: "0 0 20px" }}>
          {message || description}
        </p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <Button variant="ghost" type="button" onClick={handleClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            loading={loading}
            variant={tone === "danger" ? "primary" : "primary"}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
